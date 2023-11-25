// slice of https://github.com/git/git/blob/564d0252ca632e0264ed670534a51d18a689ef5d/branch.c

#include "git-compat-util.h"
#include "advice.h"
#include "config.h"
#include "branch.h"
#include "environment.h"
#include "gettext.h"
#include "hex.h"
#include "object-name.h"
#include "path.h"
#include "refs.h"
#include "refspec.h"
#include "remote.h"
#include "repository.h"
#include "sequencer.h"
#include "commit.h"
#include "worktree.h"
#include "submodule-config.h"
#include "run-command.h"
#include "strmap.h"

struct tracking {
	struct refspec_item spec;
	struct string_list *srcs;
	const char *remote;
	int matches;
};

struct find_tracked_branch_cb {
	struct tracking *tracking;
	struct string_list ambiguous_remotes;
};

/**
 * Install upstream tracking configuration for a branch; specifically, add
 * `branch.<name>.remote` and `branch.<name>.merge` entries.
 *
 * `flag` contains integer flags for options; currently only
 * BRANCH_CONFIG_VERBOSE is checked.
 *
 * `local` is the name of the branch whose configuration we're installing.
 *
 * `origin` is the name of the remote owning the upstream branches. NULL means
 * the upstream branches are local to this repo.
 *
 * `remotes` is a list of refs that are upstream of local
 */
static int install_branch_config_multiple_remotes(int flag, const char *local,
		const char *origin, struct string_list *remotes)
{
	const char *shortname = NULL;
	struct strbuf key = STRBUF_INIT;
	struct string_list_item *item;
	int rebasing = should_setup_rebase(origin);

	if (!remotes->nr)
		BUG("must provide at least one remote for branch config");
	if (rebasing && remotes->nr > 1)
		die(_("cannot inherit upstream tracking configuration of "
		      "multiple refs when rebasing is requested"));

	/*
	 * If the new branch is trying to track itself, something has gone
	 * wrong. Warn the user and don't proceed any further.
	 */
	if (!origin)
		for_each_string_list_item(item, remotes)
			if (skip_prefix(item->string, "refs/heads/", &shortname)
			    && !strcmp(local, shortname)) {
				warning(_("not setting branch '%s' as its own upstream"),
					local);
				return 0;
			}

	strbuf_addf(&key, "branch.%s.remote", local);
	if (git_config_set_gently(key.buf, origin ? origin : ".") < 0)
		goto out_err;

	strbuf_reset(&key);
	strbuf_addf(&key, "branch.%s.merge", local);
	/*
	 * We want to overwrite any existing config with all the branches in
	 * "remotes". Override any existing config, then write our branches. If
	 * more than one is provided, use CONFIG_REGEX_NONE to preserve what
	 * we've written so far.
	 */
	if (git_config_set_gently(key.buf, NULL) < 0)
		goto out_err;
	for_each_string_list_item(item, remotes)
		if (git_config_set_multivar_gently(key.buf, item->string, CONFIG_REGEX_NONE, 0) < 0)
			goto out_err;

	if (rebasing) {
		strbuf_reset(&key);
		strbuf_addf(&key, "branch.%s.rebase", local);
		if (git_config_set_gently(key.buf, "true") < 0)
			goto out_err;
	}
	strbuf_release(&key);

	if (flag & BRANCH_CONFIG_VERBOSE) {
		struct strbuf tmp_ref_name = STRBUF_INIT;
		struct string_list friendly_ref_names = STRING_LIST_INIT_DUP;

		for_each_string_list_item(item, remotes) {
			shortname = item->string;
			skip_prefix(shortname, "refs/heads/", &shortname);
			if (origin) {
				strbuf_addf(&tmp_ref_name, "%s/%s",
					    origin, shortname);
				string_list_append_nodup(
					&friendly_ref_names,
					strbuf_detach(&tmp_ref_name, NULL));
			} else {
				string_list_append(
					&friendly_ref_names, shortname);
			}
		}

		if (remotes->nr == 1) {
			/*
			 * Rebasing is only allowed in the case of a single
			 * upstream branch.
			 */
			printf_ln(rebasing ?
				_("branch '%s' set up to track '%s' by rebasing.") :
				_("branch '%s' set up to track '%s'."),
				local, friendly_ref_names.items[0].string);
		} else {
			printf_ln(_("branch '%s' set up to track:"), local);
			for_each_string_list_item(item, &friendly_ref_names)
				printf_ln("  %s", item->string);
		}

		string_list_clear(&friendly_ref_names, 0);
	}

	return 0;

out_err:
	strbuf_release(&key);
	error(_("unable to write upstream branch configuration"));

	advise(_("\nAfter fixing the error cause you may try to fix up\n"
		"the remote tracking information by invoking:"));
	if (remotes->nr == 1)
		advise("  git branch --set-upstream-to=%s%s%s",
			origin ? origin : "",
			origin ? "/" : "",
			remotes->items[0].string);
	else {
		advise("  git config --add branch.\"%s\".remote %s",
			local, origin ? origin : ".");
		for_each_string_list_item(item, remotes)
			advise("  git config --add branch.\"%s\".merge %s",
				local, item->string);
	}

	return -1;
}
