export interface UserData {
  success: boolean;
  data: [
    {
      id: number;
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      jobTitle: string;
    }
  ];
}
