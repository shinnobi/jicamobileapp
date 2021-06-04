import Constants from './Constants';

/*
  properties: {
    osm_id: 6511272,
    osm_type: "N",
    country: "Việt Nam",
    osm_key: "place",
    city: "Phường Suối Hoa",        // Phường/Xã
    osm_value: "suburb",            // suburb: Chính xác đến Phường/Xã
    postcode: "0241",
    name: "Bắc Ninh",               // Tên của object osm
    state: "Bắc Ninh",              // Tỉnh/TP trực thuộc trung ương
    district: "Thành phố Bắc Ninh"  // Quận/Huyện/TP trực thuộc Tỉnh/Thị xã/Thị trấn
  }
*/

/*
  properties: {
    osm_id: 24765,
    osm_type: "R",
    extent: [
      103.53041,
      22.79785,
      103.96188,
      22.39631
    ],
    country: "Việt Nam",
    osm_key: "boundary",
    osm_value: "administrative",  // administrative: Chính xác đến Quận/Huyện/...
    name: "Bát Xát",              // Tên của object osm
    state: "Lào Cai"
  }
*/

/*
  properties: {
    osm_id: 408823207,
    osm_type: "W",
    extent: [
      105.8023322,
      21.0078253,
      105.8047209,
      21.0055011
    ],
    country: "Vietnam",
    osm_key: "highway",
    city: "Nhân Chính",
    osm_value: "tertiary",
    postcode: "170",
    name: "Hoàng Đạo Thúy",
    state: "Thành Phố Hà Nội"
  }
  }
*/

export const parseLocationAddress = (data, detailed = true) => {
  const addressInfo = data && data.properties ? data.properties : null;
  let addressState = addressInfo ? addressInfo.region : '';
  if (
    !addressState &&
    addressInfo &&
    addressInfo &&
    addressInfo.osm_value &&
    addressInfo.osm_value === 'state'
  ) {
    addressState = addressInfo.name || '';
  }
  if (addressState) {
    // replace unused text
    const addressTerm = Constants.address;
    const patternState = new RegExp(`^${addressTerm.City}|${addressTerm.State}`, 'gi');
    const result = {};
    const validatedState = addressState.replace(patternState, '').trim();
    result.state = validatedState;
    let addressText = validatedState;

    const district = addressInfo.county ? addressInfo.county : addressInfo.name;
    if (district) {
      const patternDistrict = new RegExp(
        `^${addressTerm.City}|${addressTerm.District}|${addressTerm.County}|${addressTerm.Town}|${addressTerm.Commune}`,
        'gi'
      );
      const validatedDistrict = district.replace(patternDistrict, '').trim();
      if (result.state !== validatedDistrict) {
        result.district = validatedDistrict;
        addressText = `${validatedDistrict}, ${addressText}`;
      }
    }

    if (addressInfo.county) {
      const ward = addressInfo.locality ? addressInfo.locality : addressInfo.name;
      if (ward) {
        const patternWard = new RegExp(`^${addressTerm.Ward}|${addressTerm.Village}`, 'gi');
        const validatedWard = ward.replace(patternWard, '').trim();
        result.ward = validatedWard;
        if (detailed) addressText = `${validatedWard}, ${addressText}`;
      }
    }

    result.addressText = addressText;
    return result;
  }

  return { addressText: Constants.defaultAddress };
};

// const parseOpenStreetMapLocationAddress = data => {
//   let addressData = data.display_name ? data.display_name.split(',') : [];
//   const addressInfo = data.address || {};
//   if (addressData.length) {
//     // remove postcode, Việt Nam
//     if (addressInfo.postcode) {
//       addressData.splice(-2);
//     } else {
//       addressData.splice(-1);
//     }

//     addressData = addressData.map(d => d.trim()); // remove space

//     // replace unused text
//     const addressTerm = Constants.address;
//     const pattern = new RegExp(
//       `^${Constants.address.City}|${Constants.address.State}|${addressTerm.District}|${addressTerm.County}|${addressTerm.Town}|${addressTerm.Commune}|${addressTerm.Ward}|${addressTerm.Village}`,
//       'gi'
//     );
//     addressData = addressData.map(data =>
//       data.length < 10 ? data : data.replace(pattern, '').trim()
//     );

//     // Sometime, OpenStreetMap return dupplicate region names
//     if (addressData[2] === addressData[1]) {
//       addressData[2] = '';
//     } else if (addressData[1] === addressData[0]) {
//       addressData[1] = '';
//     }

//     // filter empty item
//     addressData = addressData.filter(item => !!item);

//     // remove unused elements
//     if (addressData.length > 3) {
//       // // remove last
//       // addressData = addressData.slice(0, 3);

//       // remove first
//       addressData.splice(0, addressData.length - 3);
//     }

//     return addressData.join(', ');
//   }

//   return Constants.defaultAddress;
// };
