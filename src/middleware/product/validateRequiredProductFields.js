import { REQUIRED_PRODUCT_FIELDS } from "../validators/products/productValidation.js";
import { BadRequest } from "../../utils/errors.js";

export const validateRequiredProductFields = (req, res, next) => {
    const product = req.body;
    const productFieldKeys = Object.keys(product);


    const fieldRequired = REQUIRED_PRODUCT_FIELDS.filter(
        (field) => !productFieldKeys.includes(field) || !product[field] || product[field].trim() === ''
    );

    if (fieldRequired.length > 0) {
        throw new BadRequest({ message: "Faltan campos requeridos o tienen datos vacíos", fields: fieldRequired })
    }

    const invalidFields = productFieldKeys.filter(
        (field) => !REQUIRED_PRODUCT_FIELDS.includes(field)
    );

    if (invalidFields.length > 0) {
        throw new BadRequest({ message: "Existen campos no válidos", fields: invalidFields })
    }

    next();
};