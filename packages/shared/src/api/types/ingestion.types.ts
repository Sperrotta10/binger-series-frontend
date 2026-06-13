export interface IngestionTriggerResponse {
  status: string;
  message: string;
  data: {
    job_id: string;
    status: string;
    timestamp: number;
  };
}

export interface IngestionSyncResponse {
  status: string;
  message: string;
  data: {
    affected_shows_found: number;
  };
}
