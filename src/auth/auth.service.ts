import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        console.log(await bcrypt.hash(pass, 10));
        if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      // async login(user: any) {
      //   // console.log(user.user);
        
      //   const payload = { 
      //       user : {
      //           id: user.user.id, 
      //           email: user.user.email, 
      //           name: user.user.name, 
      //           created_at: user.user.created_at, 
      //           updated_at: user.user.updated_at 
      //       }
      //   };
      //   // console.log({payload});
      //   return {
      //     access_token: this.jwtService.sign(payload),
      //   };
    
      // }
    
      //   async register(data: User) {
      //       data.password = await bcrypt.hash(data.password, 10)
      //       let response = await this.userService.createUser(data);
      //       if (response) {
      //           const { password, ...result } = response;
      //           return result;
      //       }
      //   }
    
      // decodeToken(token) : any {
      //   return this.jwtService.decode(token)
      // }

      async signIn(
        // username: string,
        email: string,
        password: string,
      ): Promise<{ access_token: string }> {
        // Search the user in the database
        const user = await this.userService.findOne(email);
        // I check if I find a user and if the password matches
        // if (user?.password !== password) {
        // // If the password does not match, this exception is thrown.
        //   throw new UnauthorizedException();
        // }
        // If the authentication goes well, I generate a token 
        const payload = { sub: user.id, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}