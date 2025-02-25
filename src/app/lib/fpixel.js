export const FB_PIXEL_ID = '465789456465893';

export const fbPageview = () => {
    window&&window?.fbq("track", "PageView");
};


export const fbEvent = (name, options = {}) => {
  window&&window?.fbq("track", name, options);
};