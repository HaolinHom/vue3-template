export type Response = {
  data: {
    code: string;
    data: string;
    message: string;
    success: boolean;
  };
};

export async function throwError(response: Response) {
  // TIPS: 根据错误码，进行相应的处理
  switch (response.data?.code) {
    default:
  }
}
