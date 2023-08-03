package main

import (
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Go Movies up and running",
		Version: "1.0.0",
	}

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Print(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	var movies []models.Movie

	rd, _ := time.Parse("2006-01-02", "1977-05-25")

	starwars := models.Movie{
		ID:          1,
		Title:       "Star Wars",
		ReleaseDate: rd,
		MPAARating:  "PG",
		RunTime:     121,
		Description: "Greatest Sci-Fi film ever made!",
		Image:       "blarg!",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, starwars)

	rd, _ = time.Parse("2006-01-02", "1979-08-17")

	lifeofbrian := models.Movie{
		ID:          2,
		Title:       "Monty Python's Life of Brian",
		ReleaseDate: rd,
		RunTime:     94,
		MPAARating:  "R",
		Description: "Best Monty Python film.",
		Image:       "blarg!",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, lifeofbrian)

	out, err := json.Marshal(movies)
	if err != nil {
		fmt.Print(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}
