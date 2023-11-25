// https://xo.dev/articles/how-search-engine-works

package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"sort"
	"strings"
)

type Document struct {
	ID      int
	Content string
	Score   float64
}

type InvertedIndex map[string][]int

type SearchEngine struct {
	index        InvertedIndex
	documents    []Document
	avgDocLength float64
	k1, b        float64
}

func BuildInvertedIndex(documents []Document) InvertedIndex {
	index := make(InvertedIndex)

	for _, doc := range documents {
		tokens := strings.Fields(strings.ToLower(doc.Content))

		for _, token := range tokens {
			if _, ok := index[token]; !ok {
				index[token] = make([]int, 0)
			}
			index[token] = append(index[token], doc.ID)
		}
	}

	return index
}

func (se *SearchEngine) CalculateTFIDFScore(tokens []string) map[int]float64 {
	scores := make(map[int]float64)

	for _, token := range tokens {
		if docSet, ok := se.index[token]; ok {
			idf := math.Log(float64(len(se.documents)) / float64(len(docSet)))
			for _, docID := range docSet {
				tf := float64(strings.Count(strings.ToLower(se.documents[docID].Content), token))
				scores[docID] += tf * idf
			}
		}
	}

	return scores
}

func (se *SearchEngine) Search(query string) []Document {
	tokens := strings.Fields(strings.ToLower(query))
	scores := se.CalculateTFIDFScore(tokens)

	var results []Document
	for docID, score := range scores {
		results = append(results, Document{ID: docID, Content: se.documents[docID].Content, Score: score})
	}
	sort.Slice(results, func(i, j int) bool {
		return results[i].Score > results[j].Score
	})
	if len(results) > 10 {
		results = results[:10]
	}
	return results
}

func main() {
	documents := []Document{
		{ID: 0, Content: "Lorem ipsum blah blah fox"},
	}

	index := BuildInvertedIndex(documents)
	docLength := 0.
	for _, doc := range documents {
		docLength += float64(len(doc.Content))
	}
	searchEngine := SearchEngine{index: index, documents: documents, avgDocLength: docLength / float64(len(documents)), k1: 1.2, b: 0.75}

	for {
		fmt.Print("Enter a search query: ")
		query, _ := bufio.NewReader(os.Stdin).ReadString('\n')
		query = strings.TrimSpace(query)
		if query == "" {
			break
		}
		results := searchEngine.Search(query)
		fmt.Printf("%d results for query '%s':\n", len(results), query)
		for _, result := range results {
			fmt.Printf("- %s (score=%.2f)\n", result.Content, result.Score)
		}
	}
}

0i
0123i         // == 123i for backward-compatibility
0o123i        // == 0o123 * 1i == 83i
0xabci        // == 0xabc * 1i == 2748i
0.i
2.71828i
1.e+0i
6.67428e-11i
1E6i
.25i
.12345E+5i
0x1p-2i       // == 0x1p-2 * 1i == 0.25i

