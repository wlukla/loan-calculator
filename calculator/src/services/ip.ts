class IpService {
  token: string;
  urlBase: string;

  constructor() {
    this.token = '116408751d826f';
    this.urlBase = 'https://ipinfo.io/';

    this.getData = this.getData.bind(this);
    this.getZip = this.getZip.bind(this);
  }

  async getData() {
    const res = await fetch(`${this.urlBase}?token=${this.token}`);
    return res.json();
  }

  async getZip() {
    const data = await this.getData();
    return data.postal;
  }
}

export default IpService;
