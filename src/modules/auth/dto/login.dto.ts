import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  @Expose()
  accessToken: string;

  @ApiProperty({ description: 'ID of the user' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  @Transform(({ obj }) => obj.id)
  @Expose()
  userId: number;
}

export class LoginRequestDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'jhondeo@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    example: '**********',
  })
  @IsNotEmpty()
  password: string;
}
