import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ groups: ['patch'] })
  id: string;

  @IsString()
  @IsOptional({ groups: ['patch'] })
  @IsNotEmpty({ groups: ['post'] })
  username: string

  @IsString()
  @IsOptional({ groups: ['patch'] })
  @IsNotEmpty({ groups: ['post'] })
  firstName: string

  @IsString()
  @IsOptional({ groups: ['patch'] })
  @IsNotEmpty({ groups: ['post'] })
  lastName: string

  @IsEmail()
  @IsOptional()
  email: string
}

// export class AdditionalUsersModel {
//   @IsString()
//   @IsNotEmpty({ groups: ['patch'] })
//   id: string;
// }
