export interface AuthenticatedRequest {
  readonly userId: string;
  readonly groups?: string[];
}
