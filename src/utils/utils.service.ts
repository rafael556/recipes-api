import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UtilsService {
  /**
   * Generate a v4 uuid
   * @returns string
   */
  generateUUID(): string {
    return uuidv4();
  }
}
