export const postEvent = (evt: string) => {
  try {
    umami && umami(evt);
  } catch (err) {
    console.log("error in posting analytics event", err);
  }
};
