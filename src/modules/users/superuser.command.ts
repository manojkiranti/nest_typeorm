import { Command, CommandRunner, Option } from 'nest-commander';
import { AdminService } from './admin.service';
import { Injectable } from '@nestjs/common';

interface SuperUserCommandOptions {
  email: string;
  password: string;
}

@Command({ name: 'create-superuser', description: 'Create a superuser' })
@Injectable()
export class SuperUserCommand extends CommandRunner {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  async run(
    passedParam: string[],
    options?: SuperUserCommandOptions,
  ): Promise<void> {
    console.log('passedParam', passedParam);
    console.log('options', options);
    if (!options?.email || !options?.password) {
      console.log('Email and Password are required to create a superuser.');
      return;
    }
    await this.adminService.createSuperUser(options.email, options.password);
  }

  @Option({
    flags: '-e, --email [email]',
    description: 'Email of the superuser',
    required: true,
  })
  parseString(val: string): string {
    console.log('email', val);
    return val;
  }

  @Option({
    flags: '-p, --password [password]',
    description: 'Password of the superuser',
    required: true,
  })
  parsePassword(val: string): string {
    return val;
  }
}
