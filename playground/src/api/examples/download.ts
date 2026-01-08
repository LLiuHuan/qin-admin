/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-08-01 04:06:37
 * @LastEditTime: 2026-01-08 16:34:31
 * @LastEditors: LLiuHuan
 */
import type { RequestResponse } from '@qin/request';

import { client } from '../request';

const DownloadAPI = {
  /**
   * 下载文件，获取Blob
   * @returns Blob
   */
  file1() {
    return client.get<Blob>(
      `https://unpkg.com/arco-static@0.0.3/source/logo.png`,
    );
  },
  /**
   * 下载文件，获取完整的Response
   * @returns RequestResponse<Blob>
   */
  file2() {
    return client.get<RequestResponse<Blob>>(
      `https://unpkg.com/arco-static@0.0.3/source/logo.png`,
      {
        responseReturn: 'raw',
      },
    );
  },
};

export default DownloadAPI;
