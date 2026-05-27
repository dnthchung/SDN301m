

// Một Angular Component gồm 3 phần chính xếp theo thứ tự: 
// @Component({
//   selector: 'app-profile-page',
//   imports: [],
//   templateUrl: './profile-page.html',
//   styleUrl: './profile-page.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ProfilePage {}

import { ChangeDetectionStrategy, Component } from '@angular/core';   // ① IMPORT

@Component({                                         // ② DECORATOR
  selector: 'app-profile-page',                      //    └─ METADATA (object bên trong)
  imports: [],                                       //       ├─ selector
  templateUrl: './profile-page.html',                //       ├─ imports
  styleUrl: './profile-page.scss',                   //       ├─ templateUrl
  changeDetection: ChangeDetectionStrategy.OnPush,   //       ├─ styleUrl
})                                                   //       └─ changeDetection

export class ProfilePage {}                // ③ CLASS (logic của component)
