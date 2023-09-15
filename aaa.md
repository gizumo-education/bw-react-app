- todos のデータを useState で状態管理しているものを、recoil で状態管理をする。
- useEffect で setTodos の引数に現在の todo のデータを受け取る。
- useSetRecoilValue 関数で引数で取得した todo のデータの更新だけさせる。
- selector 関数の中に get メソッドを使い todoState を取得。
- 取得した todoState に対して、filter メソッドを使い、iscompleted か!iscompleted か
  を判定し、それぞれ条件に合った todos を useRecoilValue 関数で読み込む。
- map メソッドで iscompleted が 完了か未完了の時に、表示するコンポーネントで受け取り、
  出しわけしている。
- listitem フォルダで iscompleted か

## local state と　 global state 違い

- Local State: コンポーネント内に閉じられた状態 = そのコンポーネント内でしか参照できない
- Global State: アプリケーション全体で共有したい状態 = 複数のコンポーネントで参照できる。
