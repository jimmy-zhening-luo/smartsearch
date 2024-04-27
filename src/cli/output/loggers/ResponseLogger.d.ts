export type ResponseLogger<Return> = (
  title: string,
  subtitle: string,
  body: string[] | string,
)=> Return;
