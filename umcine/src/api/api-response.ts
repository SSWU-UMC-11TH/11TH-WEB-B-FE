// UMCine 서버는 성공과 실패 모두 같은 모양으로 응답해요.
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
