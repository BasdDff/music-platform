import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import * as path from "path"
import {ServeStaticModule} from "@nestjs/serve-static";
import {UserModule} from "./user/user.module";
import {RoleModule} from "./role/role.module";
import {AuthModule} from "./auth/auth.module";

@Module({
     imports: [
         ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
         MongooseModule.forRoot("mongodb+srv://admin:admin@cluster0.dlsc0.mongodb.net/music-platform?retryWrites=true&w=majority"),
         UserModule,
         RoleModule,
         AuthModule,
         TrackModule,
         FileModule]
})
export class AppModule {

}