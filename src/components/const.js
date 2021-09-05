export const cameraList = rover => {
    switch (rover) {
      case 'curiosity':
        return [{ name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' }, { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
        { name: 'NAVCAM', fullName: 'Navigation Camera' }, { name: 'MAST', fullName: 'Mast Camera' },
        { name: 'CHEMCAM', fullName: 'Chemistry and Camera Complex' }, { name: 'MAHLI', fullName: 'Mars Hand Lens Imager' },
        { name: 'MARDI', fullName: 'Mars Descent Imager' }];
      case 'opportunity':
        return [{ name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' }, { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
        { name: 'NAVCAM', fullName: 'Navigation Camera' }, { name: 'PANCAM', fullName: 'Panoramic Camera' },
        { name: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)' }];
      case 'spirit':
        return [{ name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' }, { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
        { name: 'NAVCAM', fullName: 'Navigation Camera' }, { name: 'PANCAM', fullName: 'Panoramic Camera' },
        { name: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)' }];
      default:
        return [];
    }
  }

export const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 200,
      label: '200',
    },
    {
      value: 300,
      label: '300',
    },
    {
      value: 400,
      label: '400',
    },
    {
      value: 500,
      label: '500',
    },
    {
      value: 600,
      label: '600',
    },
    {
      value: 700,
      label: '700',
    },
    {
      value: 800,
      label: '800',
    },
    {
      value: 900,
      label: '900',
    },
    {
      value: 1000,
      label: '1000',
    },
  ];