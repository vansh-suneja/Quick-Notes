import React from 'react'

export const About = () => {

  return (
    <div>
      <div className="container h-25 mb-3">
        <h2 className="text-left my-2">About NotesMan</h2>
        <hr />
        <div className="row">
          <div className="col-4">
            <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
              <p className='fs-3'>About section Index</p>
              <nav className="nav nav-pills flex-column">
                <span className="nav-link">User</span>
                <nav className="nav nav-pills flex-column">
                  <span className="nav-link ms-3 my-1">Sign Up</span>
                  <span className="nav-link ms-3 my-1">Login</span>
                </nav>
                <span className="nav-link">Notes</span>
                <nav className="nav nav-pills flex-column">
                  <nav className="nav nav-pills flex-column">
                    <span className="nav-link ms-3 my-1">Add Note</span>
                    <span className="nav-link ms-3 my-1">Edit Note</span>
                    <span className="nav-link ms-3 my-1">Delete Note</span>
                  </nav>
                </nav>
              </nav>
            </nav>
          </div>
          <div className="col-8">
            <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabIndex="0">
              <div id="item-1">
                <h4>User</h4>
                <hr />
              </div>
              <div id="item-1-1">
                <h5>Sign Up</h5>
                <p>If you are new to NotesMan then you should first create an account to use it and create,edit and delete your notes.
                  The signup process is easy .You just need to provide your "Name","Email ID" and a <strong>strong</strong> "Password".
                </p>
              </div>
              <div id="item-1-2">
                <h5>Login</h5>
                <p>If you have already created an account then you can directly login and start creating your notes.
                  In case you are new to NotesMan then we recommend you to first create an account.
                </p>
                <br /><hr />
              </div>
              <div id="item-2">
                <h4>Notes</h4>
                <hr />
              </div>
              <div id="item-2-1">
                <h5>Add Note</h5>
                <p>Give Title , Description And apply a tag to your note and Add it.And there you go , you will see the note you just created now.</p>
              </div>
              <div id="item-2-2">
                <h5>Edit Note</h5>
                <p>Click on the `pen-paper` icon 
                  A modal appears saying edit note with the data already filled in the data feilds 
                  Apply changes and click <kbd className='bg-primary'>Edit</kbd> to save changes 
                  And Hurray there you have your note changed.
                </p>
              </div>
              <div id="item-2-3">
                <h5>Delete Note</h5>
                <p>Click on the `trashcan` icon 
                  And your note gets deleted forever...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
