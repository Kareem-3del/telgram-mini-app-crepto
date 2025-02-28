
const TasksPage = () => {
	return (
		<div className="p-4 bg-[#1a1a1a] text-white min-h-screen">
			{/* Header */}
			<div className="text-center text-2xl font-bold mb-4">Tasks</div>

			{/* Your Balance */}
			<div className="text-center text-gray-400 text-sm mb-2">Your Balance:</div>
			<div className="text-center text-4xl font-bold mb-6">150,081</div>

			{/* Description */}
			<div className="text-center text-gray-400 text-sm mb-8">
				Earn W-coin rewards by completing simple tasks
			</div>

			{/* How Tasks Work */}
			<div className="text-center text-gray-400 text-sm mb-4">
				How tasks work?
			</div>

			{/* Tasks List */}
			<div className="space-y-4">
				{/* Task 1 */}
				<div className="flex justify-between items-center p-4 bg-[#012237] rounded-lg">
					<div className="flex items-center gap-2">
						<span className="text-lg">Tea-Fi Miner</span>
					</div>
					<span className="text-lg text-[#fdb224]">+100</span>
				</div>

				{/* Task 2 */}
				<div className="flex justify-between items-center p-4 bg-[#012237] rounded-lg">
					<div className="flex items-center gap-2">
						<span className="text-lg">Tycqn Youtube Active Com</span>
					</div>
					<span className="text-lg text-[#fdb224]">+200,000</span>
				</div>

				{/* Task 3 */}
				<div className="flex justify-between items-center p-4 bg-[#012237] rounded-lg">
					<div className="flex items-center gap-2">
						<span className="text-lg">Easy money with JetTon!</span>
					</div>
					<span className="text-lg text-[#fdb224]">+50,000</span>
				</div>

				{/* Task 4 */}
				<div className="flex justify-between items-center p-4 bg-[#012237] rounded-lg">
					<div className="flex items-center gap-2">
						<span className="text-lg">Play Burger Blast</span>
					</div>
					<span className="text-lg text-[#fdb224]">+50,000</span>
				</div>

				{/* Task 5 */}
				<div className="flex justify-between items-center p-4 bg-[#012237] rounded-lg">
					<div className="flex items-center gap-2">
						<span className="text-lg">BIT4Start mining</span>
					</div>
					<span className="text-lg text-[#fdb224]">+50,000</span>
				</div>
			</div>
		</div>
	);
};

export default TasksPage;