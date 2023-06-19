# react-app

React Lesson アプリケーション作成

## 環境構築

1. リポジトリをクローン

```sh
git clone https://github.com/gizumo-education/react-app.git
```

2. 対象ディレクトリへ移動

```sh
cd react-app
```

3. パッケージをインストール

```sh
npm i
```

4. アプリケーション起動

```sh
npm run start
```

5. ブラウザで[localhost:8000](http://localhost:8000)が立ち上がり、Todo アプリ画面が表示されることを確認

## ディレクトリ構成

ディレクトリ構成は以下のようになっています。

```
.
├── client     # フロントエンドのソースコード
├── server     # バックエンドのソースコード
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
```

フロントエンドとバックエンドに別れていますが、レッスンで取り扱うのはフロントエンドのみになります。  
そのため client ディレクトリの構成についてのみ説明していきます。

```
client
├── src
│   ├── components
│   │   ├── pages
│   │   └── ui
│   ├── styles
│   └── main.jsx
├── .eslintrc.json
├── .gitignore
├── .prettier.json
├── .stylelintrc.json
├── index.html
├── package.json
└── vite.config.js
```

| ディレクトリ | 説明                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- |
| components   | React のコンポーネントを格納するディレクトリ                                            |
| pages        | ページコンポーネントを格納するディレクトリ<br>1 コンポーネントが 1 ページになるイメージ |
| ui           | ロジックを持たず見た目にのみ責務を持つ UI コンポーネントを格納するディレクトリ          |
| styles       | アプリケーション全体のスタイルが定義された CSS ファイルを格納するディレクトリ           |
| main.jsx     | アプリケーションのエントリーポイント                                                    |
