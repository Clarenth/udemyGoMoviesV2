package main

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
)

type JSONResponse struct {
	Error   bool        `json:"error"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// writeJSON takes data and transforms it into JSON for a network response to a client request.
func (app *application) writeJSON(w http.ResponseWriter, status int, data interface{}, headers ...http.Header) error {
	out, err := json.Marshal(data)
	if err != nil {
		return err
	}

	if len(headers) > 0 {
		for key, value := range headers[0] {
			w.Header()[key] = value
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_, err = w.Write(out)
	if err != nil {
		return err
	}

	return nil
}

// readJSON parses a JSON request from a client to the server.
func (app *application) readJSON(w http.ResponseWriter, r *http.Request, data interface{}) error {
	maxBytes := 1024 * 1024                                  // size of 1MB
	r.Body = http.MaxBytesReader(w, r.Body, int64(maxBytes)) // limits the size of the JSON request

	dec := json.NewDecoder(r.Body)

	// we ensure that the decoder can only read fields that are know to it
	dec.DisallowUnknownFields()

	err := dec.Decode(data)
	if err != nil {
		// if the decoding error is reached then the JSON may be too big, not JSON, includes unknown fields, etc.
		return err
	}

	// we prevent the JSON request from having more than one file which may be malicious or otherwise.
	err = dec.Decode(&struct{}{})
	if err != io.EOF {
		return errors.New("body must only contain a single JSON value")
	}

	return nil
}

func (app *application) errorJSON(w http.ResponseWriter, err error, status ...int) error {
	statusCode := http.StatusBadRequest

	if len(status) > 0 {
		statusCode = status[0]
	}

	var payload JSONResponse
	payload.Error = true
	payload.Message = err.Error()

	return app.writeJSON(w, statusCode, payload)
}
