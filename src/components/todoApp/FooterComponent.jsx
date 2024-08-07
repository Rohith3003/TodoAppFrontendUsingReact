export default function FooterComponent() {

    let date = new Date();
    return (
      <footer className='footer'>
        <div className='container'>
          Copyright &#169; {date.getFullYear()}
        </div>
      </footer>
    )
  }
  