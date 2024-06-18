import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Guards
import { AdminGuard } from './services/guards/admin.guard';

// PrimeNG
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SpaceJoyComponent } from './pages/space-joy/space-joy.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { DashHomeAdminComponent } from './admin/home-admin/dash-home-admin/dash-home-admin.component';
import { PlayerComponent } from './admin/player/player.component';
import { AddPlayerComponent } from './admin/player/add-player/add-player.component';
import { EditPlayerComponent } from './admin/player/edit-player/edit-player.component';
import { InitialComponent } from './pages/home/initial/initial.component';
import { UploadFilesComponent } from './admin/upload-files/upload-files.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesAdminComponent } from './admin/courses-admin/courses-admin.component';
import { AddCourseComponent } from './admin/courses-admin/add-course/add-course.component';
import { HeaderUploadFilesComponent } from './admin/upload-files/header-upload-files/header-upload-files.component';
import { EditCourseComponent } from './admin/courses-admin/edit-course/edit-course.component';
import { KitAdminComponent } from './admin/kit-admin/kit-admin.component';
import { AddKitComponent } from './admin/kit-admin/add-kit/add-kit.component';
import { EditKitComponent } from './admin/kit-admin/edit-kit/edit-kit.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { PlayerAppComponent } from './player-app/player-app.component';
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SpaceJoyComponent,
    RegisterComponent,
    HomeAdminComponent,
    DashHomeAdminComponent,
    PlayerComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    InitialComponent,
    UploadFilesComponent,
    CoursesComponent,
    CoursesAdminComponent,
    AddCourseComponent,
    HeaderUploadFilesComponent,
    EditCourseComponent,
    KitAdminComponent,
    AddKitComponent,
    EditKitComponent,
    MyProfileComponent,
    PlayerAppComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxSpinnerModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MenuModule,
        MessagesModule,
        ConfirmDialogModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        FileUploadModule,
        ProgressBarModule,
        DialogModule,
        PasswordModule,
        CardModule,
        InputTextareaModule,
        DropdownModule,
        TreeTableModule,
        TreeModule,
        ToastModule,
        RippleModule,
    ],
  providers: [AdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
