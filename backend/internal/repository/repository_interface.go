package repository

import (
	"backend/internal/models"

	"database/sql"
)

// DatabaseRepo interface exposes the functions used for interacting with a Database.
// Multiple Databases can be connected to the application if they fufill the interface functions.
type DatabaseRepo interface {
	Connection() *sql.DB
	AllMovies() ([]*models.Movie, error)
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
}
