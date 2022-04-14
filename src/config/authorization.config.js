const authorizationBearer = () => {
  const token = localStorage.getItem('tokenUser');
  if (!token) {
    return;
  } else {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  }
};
export default authorizationBearer;
