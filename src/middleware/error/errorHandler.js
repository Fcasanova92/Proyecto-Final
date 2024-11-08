
export const errorHandler = (err, req, res, next) => {
    if (err instanceof InternalServerError) {
        return res.status(500).json({ message: err.message });
    }

    if (err instanceof NotFound) {
        return res.status(404).json({ message: err.message });
    }

    if (err instanceof BadRequest) {
        return res.status(400).json({ message: err.message });
    }


    return res.status(500).json({ message: "Error interno del servidor." });
};