const LANGUAGES = <const>["ru", "en"];

export const DEFAULTLANG: language = "en";

export type language = typeof LANGUAGES[number];

export function isLanguage(str: string): str is language {
  return !!LANGUAGES.find((language) => str === language);
}

export const Multilingual_ru = {
  Login: {
    userName: "Имя пользователя",
    password: "Пароль",
    secondPassword: "Повторите пароль",
    email: "Почта",
    signIn: "Вход",
    signUp: "Регистрация",
    validate: {
      userName: {
        header: "Имя должно:",
        li: [
          "Содержать только латинские символы и цифры",
          "Иметь длину не менее 3 и не более 10 символов соответственно",
        ],
      },
      password: {
        header: "Пароль должен:",
        li: [
          "Содержать латинские буквы",
          "Имень длину не менее 8 знаков",
          "Содержать хотябы одну цифру",
        ],
      },
      secondPassword: "Пароли не совподают",
      email: "Введите действительную почту",
      auth: "Неверный логин или пароль",
    },
  },
  Home: {
    MyPage: "Моя страница",
    News: "Новости",
    Messages: "Сообщения",
    Friends: "Друзья",
    Streams: "Стримы",
    Music: "Музыка",
    screens: {
      settings: {
        button: "Редактировать",
        poster: "Постер",
      },
    },
  },
};

const Multilingual_en = {
  Login: {
    userName: "Username",
    password: "Password",
    secondPassword: "Repeat password",
    email: "Email",
    signIn: "Sign In",
    signUp: "Sign Up",
    validate: {
      userName: {
        header: "The name should:",
        li: [
          "Only Latin letters and numbers are allowed",
          "Have a length of at least 3 and no more than 10 characters, respectively",
        ],
      },
      password: {
        header: "The password must:",
        li: [
          "Contain Latin letters",
          "Name length of at least 8 characters",
          "Contain at least one digit",
        ],
      },
      secondPassword: "Passwords don't match",
      email: "Enter a valid email",
      auth: "Invalid username or password",
    },
  },
  Home: {
    MyPage: "My page",
    News: "News",
    Messages: "Messages",
    Friends: "Friends",
    Streams: "Streams",
    Music: "Music",
    screens: {
      settings: {
        button: "Редактировать",
        poster: "Постер",
      },
    },
  },
};
