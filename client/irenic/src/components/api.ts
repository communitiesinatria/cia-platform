import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import Cookies from 'universal-cookie';
// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

const cookie = new Cookies();

const endpoint =
  window.location.origin === 'http://localhost:3000'
    ? 'http://localhost:8000'
    : window.location.origin;

export async function checkAuth() {
  const token = cookie.get('token');
  if (!token) {
    // window.location.href = `${endpoint}/account/login`;
    return;
  } else {
    try {
      const result = await api.get(`${endpoint}/auth/user`, {
        withCredentials: true,
      });

      return result.data;
    } catch (error) {
      //  window.location.href = `${window.location.origin}/account/login`;
      return;
    }
  }
}

interface PasswordLogin {
  password: string;
}
interface UsernameLogin extends PasswordLogin {
  username: string;
}
interface EmailLogin extends PasswordLogin {
  email: string;
}
type LoginDetails = UsernameLogin | EmailLogin;

export async function login(login: LoginDetails) {
  const { username, email, password }: any = login;
  let result;
  try {
    //result = await api.post(`${endpoint}/auth`, { email, username, password });

    result = await api({
      maxRedirects: 0,
      method: 'post',
      url: `${endpoint}/auth`,
      data: { email, username, password },
    });

    //result = await loadDoc(`${endpoint}/auth`, { email, username, password })

    if (result.status === 400) {
      return [{ message: result.data }];
    } else if (result.status === 200) {
      const cookies = new Cookies();
      cookies.set('token', result.data, { path: '/' });
      //window.location.href = `${endpoint}/irenic`;
      return result.data;
    }
  } catch (error) {
    console.log(error);
    return [{ message: 'invalid username or password' }];
  }
}

type Post = {
  message: string;
  created_by: {
    username: string;
    profile_img?: string;
  };
  created_at: number;
  vote?: { up: number; down: number };
};
export async function post(post: Post) {
  try {
    await api({
      maxRedirects: 0,
      method: 'post',
      url: `${endpoint}/auth/posts`,
      data: post,
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getPosts(): Promise<Array<Post>> {
  try {
    const { data } = await api({
      maxRedirects: 0,
      method: 'get',
      url: `${endpoint}/auth/posts`,
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

/* function loadDoc(url: string, { username, email, password }: any) {
  const id = email || username;
  const id_name = email ? 'email' : username ? 'username' : '';

  var xhttp = new XMLHttpRequest();
  return new Promise((res, rej) => {
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        res(this.responseText);
      } else {
        rej(this);
      }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(`${id_name}=${id}&password=${password}`);
  });
}
 */
