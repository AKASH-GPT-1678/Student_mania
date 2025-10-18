export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  classes?: ClassesType[]; // classes the user owns
  memberOf?: ClassesType[]; // classes where user is a member
  createdAt: Date;
  updatedAt: Date;
};

export type AnnouncementType = {
  id: string;
  classId: string;
  category: string;
  title: string;
  description?: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AssignmentType = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
  classId: string;
};

export type ClassesType = {
  id: string;
  name?: string;
  section: string;
  room: string;
  subject: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;

  // Relations
  user: UserType;                   // class owner
  members: UserType[];              // class members
  adminList: string[];              // list of admin IDs
  announcements: AnnouncementType[]; // class announcements
  assignments: AssignmentType[];     // class assignments
};
