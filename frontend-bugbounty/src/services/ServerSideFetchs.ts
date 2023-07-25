class ServerSideFetchs {
  readonly api_url: string = `${process.env.API_URL}`;

  async test<T>(): Promise<T> {
    const response = await fetch(`${this.api_url}`);

    return response.json() as Promise<T>;
  }
}

export default new ServerSideFetchs();
