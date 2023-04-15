import React from "react";
import "./Components.scss"

export const About = ({data}) => {
  return (
    <div className="container-lower">
      <div className="lower-left">
      <table>
          <tr>
            <th>About</th>
          </tr>
          <tr>
            <td className="td-th">Faculty Id</td>
            <td className="td-tb">{data?.faculty_id}</td>
          </tr>
          <tr>
            <td className="td-th">Name</td>
            <td className="td-tb">{data?.name}</td>
          </tr>
          <tr>
            <td className="td-th">Designation</td>{" "}
            <td className="td-tb">Professor</td>
          </tr>
          <tr>
            <td className="td-th">Department</td> <td className="td-tb">ECE</td>
          </tr>
          <tr>
            <td className="td-th">DOJ</td> <td className="td-tb">{data?.DOJ}</td>
          </tr>
        </table>
      </div>
      <div
        className="lower-right"
      >
        <table>
        <tr>
            <td className="td-th">Phone No</td>
            <td className="td-tb">{data?.phone}</td>
          </tr>
          <tr>
            <td className="td-th">Email</td>
            <td className="td-tb">{data?.email}</td>
          </tr>
        <tr>
            <td className="td-th">Specialization</td>{" "}
            <td className="td-tb">{data?.specialization
}</td>
          </tr>
          <tr>
            <td className="td-th">Experiences in Teaching</td> <td className="td-tb">{data?.Exp_teach}</td>
          </tr>
          <tr>
            <td className="td-th">Experiences in Industry</td> <td className="td-tb">{data?.Exp_ind}</td>
          </tr>
         
        
       
        </table>
      </div>
    </div>
  );
};


export const UG_PG = ({data}) => {
  return (
    <div className="container-lower">
    <div className="lower-left">
    <table>
<tr>
  <th>Under Graduation</th>
</tr>
<tr>
  <td className="td-th">Course</td>
  <td className="td-tb">{data?.UG_course}</td>
</tr>
<tr>
  <td className="td-th">Specialization</td>
  <td className="td-tb">{data?.UG_special}</td>
</tr>
<tr>
  <td className="td-th">Year Of Complition</td>{" "}
  <td className="td-tb">{data?.UG_Yoc}</td>
</tr>
<tr>
  <td className="td-th">College/University</td> <td className="td-tb">{data?.UG_clg}</td>
</tr>

</table>
       
      </div>
    <div className="lower-right">
    <table>
<tr>
  <th>Post Graduation</th>
</tr>
<tr>
  <td className="td-th">Course</td>
  <td className="td-tb">{data?.PG_course}</td>
</tr>
<tr>
  <td className="td-th">Specialization</td>
  <td className="td-tb">{data?.PG_special}</td>
</tr>
<tr>
  <td className="td-th">Year Of Complition</td>{" "}
  <td className="td-tb">{data?.PhD_Yoc}</td>
</tr>
<tr>
  <td className="td-th">College/University</td> <td className="td-tb">{data?.PG_clg}</td>
</tr>

</table>
       
      </div>
    </div>
  )
}



export const PhD_ = ({data}) => {
  return (
    <div className="container-lower">
    <div className="lower-left">
    <table>
<tr>
  <th>PhD</th>
</tr>
<tr>
  <td className="td-th">Course</td>
  <td className="td-tb">{data?.PhD_course}</td>
</tr>
<tr>
  <td className="td-th">Specialization</td>
  <td className="td-tb">{data?.PhD_special}</td>
</tr>
<tr>
  <td className="td-th">Year Of Complition</td>{" "}
  <td className="td-tb">{data?.PhD_Yoc}</td>
</tr>
<tr>
  <td className="td-th">College/University</td> <td className="td-tb">{data?.PhD_clg}</td>
</tr>

</table>
       
      </div>
    <div className="lower-right">
    <table>
<tr>
  <th>Any Other</th>
</tr>
<tr>
  <td className="td-th">Course</td>
  <td className="td-tb">{data?.OE_course}</td>
</tr>
<tr>
  <td className="td-th">Specialization</td>
  <td className="td-tb">{data?.OE_special}</td>
</tr>
<tr>
  <td className="td-th">Year Of Complition</td>{" "}
  <td className="td-tb">{data?.OE_Yoc}</td>
</tr>
<tr>
  <td className="td-th">College/University</td> <td className="td-tb">{data?.OE_clg}</td>
</tr>

</table>
       
      </div>
    </div>
  )
}

export const Other_Details = ({data}) => {
  return (
    <div className="container-lower">
    <div className="lower-left">
    <table>
<tr>
  <th>Papers Published in Journals</th>
</tr>
<tr>
  <td className="td-th">National</td>
  <td className="td-tb">{data?.journals_national}</td>
</tr>
<tr>
  <td className="td-th">International</td>
  <td className="td-tb">{data?.journals_international}</td>
</tr>
<tr>
  <th>Papers Presented in Conferences</th>
</tr>
<tr>
  <td className="td-th">National</td>
  <td className="td-tb">{data?.papers_national}</td>
</tr>
<tr>
  <td className="td-th">International</td>
  <td className="td-tb">{data?.papers_international}</td>
</tr>


</table>
       
      </div>
    <div className="lower-right">
    <table>
<tr>
  <th>Any Other</th>
</tr>
<tr>
  <td className="td-th">Professional Membership</td>
  <td className="td-tb">{data?.memberships}</td>
</tr>
<tr>
  <td className="td-th">Awards / Achievements </td>
  <td className="td-tb">{data?.awards}</td>
</tr>
<tr>
  <td className="td-th">Projects </td>{" "}
  <td className="td-tb">{data?.projects}</td>
</tr>
<tr>
  <td className="td-th"> Patents </td> <td className="td-tb">{data?.pantents}</td>
</tr>

</table>
       
      </div>
    </div>
  )
}






