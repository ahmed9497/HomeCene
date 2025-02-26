export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
export const fbPageview = () => {
    window&&window?.fbq("track", "PageView");
};


export const fbEvent = (name, options = {}) => {
  window&&window?.fbq("track", name, options);
};