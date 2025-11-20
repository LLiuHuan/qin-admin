/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-08-01 04:06:37
 * @LastEditTime: 2025-08-01 04:30:01
 * @LastEditors: LLiuHuan
 */
import type { RequestResponse } from '@qin/request';

import { requestClient } from '../request';

const DownloadAPI = {
  /**
   * 下载文件，获取Blob
   * @returns Blob
   */
  file1() {
    return requestClient.download<Blob>(
      `https://unpkg.com/arco-static@0.0.3/source/logo.png`,
    );
  },
  /**
   * 下载文件，获取完整的Response
   * @returns RequestResponse<Blob>
   */
  file2() {
    return requestClient.download<RequestResponse<Blob>>(
      `https://unpkg.com/arco-static@0.0.3/source/logo.png`,
      {
        responseReturn: 'raw',
      },
    );
  },
};

export default DownloadAPI;
