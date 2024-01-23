export const businessNameValidated = (businessName: string) => {
  let errorMessage = '';
  if (Buffer.byteLength(businessName) > 50) {
    errorMessage = '상호명을 확인해주세요.'
  }
  return errorMessage
}

export const businessNumberValidated = (businessNumber: string) => {
  if (businessNumber === '') {
    return '';
  }

  const valueMap = businessNumber.replace(/-/gi, '').split('').map(function(item) {
    return parseInt(item, 10);
  });

  if (valueMap.length === 10) {
    const multiply = [1, 3, 7, 1, 3, 7, 1, 3, 5];

    let checkSum = 0;
    for (let i = 0; i < multiply.length; ++i) {
      checkSum += multiply[i] * valueMap[i];
    }
    checkSum += parseInt((multiply[8] * valueMap[8]) / 10 + '', 10);
    return Math.floor(valueMap[9]) === (10 - (checkSum % 10)) ? '' : '사업자 등록번호를 확인해주세요' ;
  }

  return '사업자 등록번호를 확인해주세요';
}

export const ownerValidated = (owner: string) => {
  if (Buffer.byteLength(owner) > 50) {
    return '대표자명을 확인해주세요.'
  }
  return ''
}

