

const Section = () => {

  return (
    <>

    <main className="container">
      <div>
    
      <div className="d-flex justify-content-center">
        <img
          className="m-3"
          src="logo-no-background.png"
          alt=""
          width="210"
          height="140"/>
      </div>
  
      <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">
      <h6 className="purple-color border-bottom pb-2 mb-0">Current Friends</h6>
    
        <div className="d-flex text-muted pt-3">
          <img className="postimg" src="{{friend.image}}" width="32" height="32" />

          <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div className="d-flex justify-content-between">
              <strong className="text-gray-dark">Ben Baker
               </strong>
              <a className="purple-color" href="/users/{{friend.id}}">View Profile</a>
            </div>
          </div>
        </div>
      
    </div>

    <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">
      <h6 className="purple-color border-bottom pb-2 mb-0">Suggested Friends</h6>
     
        <div className="d-flex text-muted pt-3">
          <img className="postimg" src="{{suggest.image}}" width="32" height="32" />

          <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div className="d-flex justify-content-between">
              <strong className="text-gray-dark">Emma Watson</strong>
              <a className="purple-color" href="/users/{{suggest.id}}">View Profile</a>
            </div>
          </div>
        </div>
     
    </div>
  </div>
</main>

    </>
  )
}


export default Section