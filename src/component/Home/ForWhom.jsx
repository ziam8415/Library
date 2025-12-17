import { FaUser, FaBook, FaUserShield } from "react-icons/fa";

const ForWhom = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Who Is <span className="text-emerald-600">BookCourier</span> For?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <div className="group bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-emerald-200">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 mb-4 group-hover:scale-110 group-hover:rotate-6 transition">
              <FaUser className="text-emerald-600 text-2xl" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">
              Readers
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover, order, and enjoy books with ease and confidence.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="group bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-blue-200">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 mb-4 group-hover:scale-110 group-hover:rotate-6 transition">
              <FaBook className="text-blue-600 text-2xl" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">
              Librarians
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Manage and publish books effortlessly for a wider audience.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="group bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-purple-200">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 mb-4 group-hover:scale-110 group-hover:rotate-6 transition">
              <FaUserShield className="text-purple-600 text-2xl" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Admins</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Control users, monitor activity, and keep the platform secure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhom;
