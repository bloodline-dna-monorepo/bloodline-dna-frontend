import { Link } from "react-router-dom"
export const FooterServices=()=>(
   /* Services */
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/paternity" className="text-gray-400 hover:text-white transition-colors">
                  Paternity Testing
                </Link>
              </li>
              <li>
                <Link to="/services/ancestry" className="text-gray-400 hover:text-white transition-colors">
                  Ancestry DNA Testing
                </Link>
              </li>
              <li>
                <Link to="/services/relationship" className="text-gray-400 hover:text-white transition-colors">
                  Relationship Testing
                </Link>
              </li>
              <li>
                <Link to="/services/legal" className="text-gray-400 hover:text-white transition-colors">
                  Legal DNA Testing
                </Link>
              </li>
              <li>
                <Link to="/services/prenatal" className="text-gray-400 hover:text-white transition-colors">
                  Prenatal DNA Testing
                </Link>
              </li>
              <li>
                <Link to="/services/genetic" className="text-gray-400 hover:text-white transition-colors">
                  Genetic Health Testing
                </Link>
              </li>
            </ul>
          </div>
)