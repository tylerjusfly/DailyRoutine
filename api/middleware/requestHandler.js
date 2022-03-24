import Logger from "@common/Logger";
import {
  ApiError,
  ValidationError,
  NotFoundError,
  ExistsError,
  BadRequestError,
  UnauthorizedError,
} from "@common/Errors";

// HOF request handler
export const RequestHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next).catch(next));
};

export const globalErrorHandler = (err, req, res, next) => {
  Logger.error(err.message);
  Logger.error(err);

  const errorRes = {
    success: false,
    message: err.message,
    errors: err?.data?.errors || err?.data,
  };

  if (err instanceof ValidationError) {
    const errors = err?.data.details;
    Logger.debug(err.data);
    const errorData = errors?.map((error) => {
      return {
        [error.path[0]]: [error.message],
      };
    });
    return res.status(422).json({
      code: err.statusCode,
      success: false,
      message: err.message,
      errors: errorData,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json(errorRes);
  }
  if (err instanceof ExistsError) {
    return res.status(403).json(errorRes);
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json(errorRes);
  }
  if (err instanceof ApiError || err instanceof BadRequestError) {
    return res.status(400).json(errorRes);
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    errors: err.message,
  });
};

export const handleResponse = (res, message, data = [], code, token = null) => {
  let response = {
    success: true,
    message: message || "",
    data,
  };
  if (token) {
    response.token = token;
  }
  return res.status(code || 200).json(response);
};
export const handleError = (res, message, error, code) => {
  let response = {
    success: false,
    message: message || "Internal server error",
    errors: error,
  };

  return res.status(code || 500).json(response);
};
