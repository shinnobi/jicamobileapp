import { moment } from './Omni';

// export const windDirectionFromDeg = deg => {
//   const directionTable = {
//     N: { min: 348.75, max: 11.25 },
//     NNE: { min: 11.25, max: 33.75 },
//     NE: { min: 33.75, max: 56.25 },
//     ENE: { min: 56.25, max: 78.75 },
//     E: { min: 78.75, max: 101.25 },
//     ESE: { min: 101.25, max: 123.75 },
//     SE: { min: 123.75, max: 146.25 },
//     SSE: { min: 146.25, max: 168.75 },
//     S: { min: 168.75, max: 191.25 },
//     SSW: { min: 191.25, max: 213.75 },
//     SW: { min: 213.75, max: 236.25 },
//     WSW: { min: 236.25, max: 258.75 },
//     W: { min: 258.75, max: 281.25 },
//     WNW: { min: 281.25, max: 303.75 },
//     NW: { min: 303.75, max: 326.25 },
//     NNW: { min: 326.25, max: 348.75 },
//   };

//   let direction = '';
//   Object.keys(directionTable).forEach(key => {
//     if (direction) return;
//     const { min, max } = directionTable[key];
//     if (deg <= max && deg >= min) {
//       direction = key;
//     }
//   });

//   return direction;
// };

export const dayTimePeriod = time => {
  const hours = moment(time).format('H');
  if (hours < 6) return 'night';
  else if (hours < 12) return 'morning';
  else if (hours < 18) return 'afternoon';
  else return 'evening';
};

export const getIconImageUrl = iconLink => {
  return iconLink || 'https://m.api.weathervietnam.vn/icons/2001.png';
  // return `https://openweathermap.org/img/w/${icon}.png`;
};

// xx90 : ngày băng giá.              x
// xx91 : đêm băng giá.               x
// xx80 : ngày sương mù.              x
// xx81 : đêm sương mù.               x

// Bão: xx70 + x3x0 & xx71 + x3x1
// xx70 : ngày bão gió giật. ==> xx70
// xx71 : đêm bão gió giật.
// x3x0 : ngày có mưa giông sấm sét.
// x3x1 : đêm có mưa giông sấm sét.

// 0000 0020 : ngày trời quang (ít mây)    0x00 + 0x20 + xx90 khi chưa có ảnh băng giá
// 0001 0011 0021: đêm trời quang (ít mây) 00x1 + xx91 khi chưa có ảnh băng giá
// 0010 : ngày nắng nóng, trời quang (ít mây).
// 0100 0110 0120 1100 1110 1120 : ngày có mưa. x1x0
// 0101 0111 0121 1101 1111 1121 : đêm có mưa.  x1x1
// 1000 1010 : trời xanh có mây.
// 1020 : trời xám có mây. 10x0 + xx80 khi chưa có ảnh sương mù
// 1001 1011 1021 : đêm có mây.  10x1 + xx81 khi chưa có ảnh sươn mù

// ---> 8 ảnh

export const getBackgroundFromCode = code => {
  const cloudCode = code[0];
  const rainCode = code[1];
  const weatherCode = code[2];
  const timeCode = code[3];
  let first, second, third, fourth;

  switch (timeCode) {
    case '1':
    case '2':
      fourth = '0';
      break;
    case '3':
      fourth = '1';
      break;
  }

  switch (weatherCode) {
    case '0':
      third = '0';
      break;
    case '1':
    case '2':
    case '3':
      third = '1'; // nắng nóng
      break;
    case '4':
    case '5':
    case '6':
      third = '2'; // rét
      break;
    case '7':
    case '8':
    case '9':
      third = weatherCode;
      break;
  }

  if (third === '7' || third === '8' || third === '9') {
    return `xx${third}${fourth}`;
  }
  switch (rainCode) {
    case '0':
    case '1':
    case '2':
      second = '0';
      break;
    case '3':
    case '4':
    case '6':
    case '7':
    case '8':
      second = '1';
      break;
    case '5':
      second = '3';
      break;
  }

  if (second === '3') {
    return `x3x${fourth}`;
  } else if (second === '1') {
    return `x1x${fourth}`;
  }

  switch (cloudCode) {
    case '0':
    case '1':
      first = '0';
      break;
    case '2':
    case '4':
      first = '1';
      break;
  }

  return `${first}${second}${third}${fourth}`;
};
