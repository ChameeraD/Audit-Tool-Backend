import { IUserRepository } from '../../../abstract/repos/user.repository.interface';
import { User } from '../../../models/user';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { mapDbItems, userMapper } from './dbMapper';

@injectable()
export class MySQLUserRepository implements IUserRepository {
  async getOrganizationByUserEmail(_email: string): Promise<User[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection.query(
        `CALL getOrganizationByUserEmail('${_email}')`,
      );
      return mapDbItems(result, userMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): User {
    throw new Error('Method not implemented.');
  }
  add(_item: User) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: User) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
