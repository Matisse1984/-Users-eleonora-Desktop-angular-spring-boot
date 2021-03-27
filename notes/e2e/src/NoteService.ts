find(filter: NoteFilter): Observable<Note[]> {
  const params = {
    title: filter.title,
  };
  const userNotes = 'http://localhost:8080/user/notes';
  return this.http.get<Note[]>(userNotes, {params, headers});
}