import axios from "axios";

const endpoint =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
const index = async () => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default index;
