/**
 * Storage API Service
 *
 * Upload file via ImageKit.
 * Mengikuti kontrak dari docs/api/core/storage.md
 */

import { api } from '@/lib/api-client';
import type { UploadedFile } from '@/types/api';

/** Upload file */
export async function uploadFile(
  file: File,
  options?: {
    module?: string;
    subFolder?: string;
  },
): Promise<UploadedFile> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await api.post<UploadedFile>('/storage/upload', formData, {
    params: {
      module: options?.module || 'lapak',
      subFolder: options?.subFolder,
    },
  });
  return res.data;
}
