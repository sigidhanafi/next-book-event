const validateResult: (result: Response) => Error | null = (
  result: Response
) => {
  if (result.status >= 500) {
    return Error("Process failed. Internal server error. Please try again");
  }

  if (result.status >= 400) {
    return Error("Process failed. Bad request. Please try again");
  }

  if (result.status >= 300) {
    return Error("Process failed. Please try again");
  }

  if (result.status >= 200) {
    return null;
  }

  return null;
};

export default validateResult;
