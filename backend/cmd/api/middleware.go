package main

import "net/http"

// enableCORS allows requests to make API calls from the same domain, but using different ports.
func (app *application) enableCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set for dev enviroment only. Change later.
		w.Header().Set("Access-Control-Allow-Origin", "http://*")

		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, x-CSRF-TOKEN, Authorization")
			return
		} else {
			h.ServeHTTP(w, r)
		}
	})
}
