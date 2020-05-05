import Fingerprint2, { Options } from 'fingerprintjs2';

export const getFingerPrintId: () => Promise<string> = async () => {
  try {
    var options = {
      fonts: { extendedJsFonts: true },
    } as Options;

    const components = await Fingerprint2.getPromise(options);
    var values = components.map((component) => component.value);
    return Fingerprint2.x64hash128(values.join(''), 31);

  } catch (error) {
    console.error(error);
    return "";
  }
};

