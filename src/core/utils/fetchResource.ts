type status = "pending" | "success" | "error";

export function createResource<T>(promise: Promise<T>) {
  let status: status = "pending";
  let result: T;
  const suspender = promise.then(
    (res: T) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender; // Suspense will catch this
      } else if (status === "error") {
        throw result; // Error Boundary will handle this
      } else if (status === "success") {
        return result;
      }
    },
  };
}
